
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom'); // 추가적인 HTML 파싱용
const fs = require('fs').promises;
const cors = require('cors');

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 초기 부스 리스트 (여기에 완성된 리스트를 넣으세요)
let listA = [
    {
        id: "A01",
        name: "사카야코리아",
        city: "",
        description: "",
    },
    {
        id: "A02", 
        name: "히마치도리",
        city: "",
        description: "",
    },
    // ... 더 많은 부스들을 추가하세요
];

class ExpressSakeBoothCrawler {
    constructor() {
        this.delay = 3000; // 2초 딜레이
        this.browser = null;
        this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async initBrowser() {
        if (!this.browser) {
            this.browser = await puppeteer.launch();
        }
        return this.browser;
    }

    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    // Google 검색을 통한 정보 수집 (개선된 버전)
    // async searchWithGoogle(boothName) {
    //     try {
    //         const searchQueries = [
    //             `"${boothName}" 일본주 사케 양조장`,
    //             `${boothName} sake brewery Japan`,
    //             `${boothName} 日本酒`
    //         ];

    //         for (const query of searchQueries) {
    //             try {
    //                 const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=ko&gl=kr`;
                    
    //                 const response = await axios.get(searchUrl, {
    //                     headers: {
    //                         'User-Agent': this.userAgent,
    //                         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    //                         'Accept-Language': 'ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3',
    //                         'Accept-Encoding': 'gzip, deflate',
    //                         'Connection': 'keep-alive',
    //                         'Upgrade-Insecure-Requests': '1',
    //                     },
    //                     timeout: 10000
    //                 });

    //                 const $ = cheerio.load(response.data);
                    
    //                 // 다양한 Google 결과 셀렉터 시도
    //                 const selectors = [
    //                     '.VwiC3b', '.hgKElc', '.s3v9rd', '.St0SEd', 
    //                     '.PZPZlf', '.a9alvf', '.hgKElc', '.IsZvec'
    //                 ];
                    
    //                 const snippets = [];
    //                 selectors.forEach(selector => {
    //                     $(selector).each((i, elem) => {
    //                         const text = $(elem).text().trim();
    //                         if (text && text.length > 20 && !snippets.includes(text)) {
    //                             snippets.push(text);
    //                         }
    //                     });
    //                 });

    //                 if (snippets.length > 0) {
    //                     return {
    //                         description: snippets.slice(0, 2).join(' ').substring(0, 300),
    //                         source: `Google Search (${query})`
    //                     };
    //                 }
                    
    //                 await this.sleep(1000); // 쿼리 간 딜레이
    //             } catch (queryError) {
    //                 console.log(`Query failed: ${query}`, queryError.message);
    //                 continue;
    //             }
    //         }
            
    //         return null;
    //     } catch (error) {
    //         console.error(`Google search error for ${boothName}:`, error.message);
    //         return null;
    //     }
    // }

    // DuckDuckGo 검색 (Google 대안)
    async searchWithDuckDuckGo(boothName) {
        try {
            const searchQuery = `${boothName} 양조장`;
            const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}`;
            
            const response = await axios.get(searchUrl, {
                headers: {
                    'User-Agent': this.userAgent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                },
                timeout: 5000
            });

            const $ = cheerio.load(response.data);
            
            const snippets = [];
            $('.result__snippet').each((i, elem) => {
                const text = $(elem).text().trim();
                if (text && text.length > 20) {
                    snippets.push(text);
                }
            });

            if (snippets.length > 0) {
                return {
                    description: snippets.slice(0, 2).join(' ').substring(0, 1000),
                    source: 'DuckDuckGo Search'
                };
            }
            
            return null;
        } catch (error) {
            console.error(`DuckDuckGo search error for ${boothName}:`, error.message);
            return null;
        }
    }

    // 위키피디아 검색 (개선된 버전)
    // async searchWikipedia(boothName) {
    //     try {
    //         const searchTerms = [boothName, boothName.replace(/\s+/g, '_')];
            
    //         for (const term of searchTerms) {
    //             // 한국어 위키피디아
    //             try {
    //                 const koUrl = `https://ko.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;
    //                 const koResponse = await axios.get(koUrl, {
    //                     headers: { 'User-Agent': this.userAgent },
    //                     timeout: 5000
    //                 });

    //                 if (koResponse.data && koResponse.data.extract && koResponse.data.extract.length > 50) {
    //                     return {
    //                         description: koResponse.data.extract,
    //                         city: "일본",
    //                         source: 'Wikipedia KO'
    //                     };
    //                 }
    //             } catch (koError) {
    //                 // 한국어 실패시 일본어 시도
    //             }

    //             // 일본어 위키피디아
    //             try {
    //                 const jaUrl = `https://ja.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;
    //                 const jaResponse = await axios.get(jaUrl, {
    //                     headers: { 'User-Agent': this.userAgent },
    //                     timeout: 5000
    //                 });

    //                 if (jaResponse.data && jaResponse.data.extract && jaResponse.data.extract.length > 50) {
    //                     return {
    //                         description: jaResponse.data.extract,
    //                         city: "일본",
    //                         source: 'Wikipedia JA'
    //                     };
    //                 }
    //             } catch (jaError) {
    //                 // 일본어도 실패
    //             }

    //             // 영어 위키피디아
    //             try {
    //                 const enUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;
    //                 const enResponse = await axios.get(enUrl, {
    //                     headers: { 'User-Agent': this.userAgent },
    //                     timeout: 5000
    //                 });

    //                 if (enResponse.data && enResponse.data.extract && enResponse.data.extract.length > 50) {
    //                     return {
    //                         description: enResponse.data.extract,
    //                         city: "일본",
    //                         source: 'Wikipedia EN'
    //                     };
    //                 }
    //             } catch (enError) {
    //                 // 영어도 실패
    //             }
    //         }

    //         return null;
    //     } catch (error) {
    //         console.error(`Wikipedia search error for ${boothName}:`, error.message);
    //         return null;
    //     }
    // }

    // Playwright를 사용한 고급 검색 (Puppeteer 대체)
    async searchWithPlaywright(boothName) {
        let page = null;
        try {
            const browser = await this.initBrowser();
            page = await browser.newPage();
            
            await page.setUserAgent(this.userAgent);
            await page.setViewportSize({ width: 1920, height: 1080 });

            const searchQuery = `"${boothName}" 사케 일본주 양조장`;
            await page.goto(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&hl=ko`);

            // 잠시 기다린 후 결과 추출
            await page.setViewport({width: 1080, height: 1024});

            // Type into search box
        await page.type('.devsite-search-field', 'automate beyond recorder');

        // Wait and click on first result
        const searchResultSelector = '.devsite-result-item-link';
        await page.waitForSelector(searchResultSelector);
        await page.click(searchResultSelector);

         // Locate the full title with a unique string
        const textSelector = await page.waitForSelector(
            'text/Customize and automate'
            );
        const fullTitle = await textSelector?.evaluate(el => el.textContent);

        // Print the full title
            console.log('The title of this blog post is "%s".', fullTitle);

        await browser.close();
    }catch (error) {
            console.error(`Puppeteer parsing error:`, error.message);
            return null;
        }
}

    // JSDOM을 사용한 추가 파싱
    async parseWithJSDOM(html, boothName) {
        try {
            const dom = new JSDOM(html);
            const document = dom.window.document;
            
            const textContent = document.body.textContent || "";
            const relevantSentences = textContent
                .split('.')
                .filter(sentence => 
                    sentence.toLowerCase().includes(boothName.toLowerCase()) ||
                    sentence.includes('사케') ||
                    sentence.includes('일본주') ||
                    sentence.includes('양조')
                )
                .slice(0, 3)
                .join('. ');
            
            return relevantSentences.length > 50 ? {
                description: relevantSentences.substring(0, 300),
                source: 'JSDOM Parsing'
            } : null;
        } catch (error) {
            console.error(`JSDOM parsing error:`, error.message);
            return null;
        }
    }

    // 메인 크롤링 함수 (개선된 버전)
    async crawlBoothInfo(booth) {
        console.log(`Processing: ${booth.name}`);
        
        const results = [];

        // 1. DuckDuckGo 검색 (Google보다 안정적)
        try {
        console.log("DuckDuck")
            const duckResult = await this.searchWithDuckDuckGo(booth.name);
            if (duckResult) results.push(duckResult);
            await this.sleep(this.delay);
        } catch (error) {
            console.error(`DuckDuckGo search failed for ${booth.name}`);
        }

        // 2. 위키피디아 검색 (가장 안정적)
        // try {
        //     const wikiResult = await this.searchWikipedia(booth.name);
        //     if (wikiResult) results.push(wikiResult);
        //     await this.sleep(1000);
        // } catch (error) {
        //     console.error(`Wikipedia search failed for ${booth.name}`);
        // }

        // 3. Google 검색 (조심스럽게)
        // try {
        // console.log("Google")
        //     const googleResult = await this.searchWithGoogle(booth.name);
        //     if (googleResult) results.push(googleResult);
        //     await this.sleep(this.delay);
        // } catch (error) {
        //     console.error(`Google search failed for ${booth.name}`);
        // }

        // 4. Playwright 검색 (최후의 수단)
        if (results.length === 0) {
            try {

        console.log("Direct search")
                const playwrightResult = await this.searchWithPlaywright(booth.name);
                if (playwrightResult) results.push(playwrightResult);
                await this.sleep(this.delay);
            } catch (error) {
                console.error(`Playwright search failed for ${booth.name}`);
            }
        }

        // 최적의 결과 선택 (위키피디아 우선, 그 다음 긴 설명)
        let bestResult = results.find(r => r.source.includes('Wikipedia'));
        console.log("BestResult", results)
        if (!bestResult) {
            bestResult = results.find(r => r.description && r.description.length > 100);
        }
        if (!bestResult) {
            bestResult = results[0];
        }
        
        return {
            ...booth,
            description: bestResult ? bestResult.description : "정보를 찾을 수 없습니다",
            city: bestResult && bestResult.city ? bestResult.city : booth.city || "일본",
            source: bestResult ? bestResult.source : "No source",
            // searchAttempts: results.length,
            // lastUpdated: new Date().toISOString()
        };
    }

    async crawlAllBooths(boothList) {
        const updatedBooths = [];
        const total = boothList.length;

        for (let i = 0; i < total; i++) {
            try {
                console.log(`Progress: ${i + 1}/${total}`);
                const updatedBooth = await this.crawlBoothInfo(boothList[i]);
                updatedBooths.push(updatedBooth);
                
                // 중간 저장
                if ((i + 1) % 5 === 0) {
                    await this.saveProgress(updatedBooths, `progress_${i + 1}.json`);
                }
            } catch (error) {
                console.error(`Error processing booth ${boothList[i].name}:`, error);
                updatedBooths.push({
                    ...boothList[i],
                    description: "크롤링 중 오류 발생",
                    lastUpdated: new Date().toISOString()
                });
            }
        }

        return updatedBooths;
    }

    async saveProgress(data, filename) {
        try {
            await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8');
            console.log(`Progress saved to ${filename}`);
        } catch (error) {
            console.error(`Failed to save progress:`, error);
        }
    }
}

// API 라우트들
const crawler = new ExpressSakeBoothCrawler();

// 부스 리스트 조회
app.get('/api/booths', (req, res) => {
    res.json(listA);
});

// 부스 리스트 업데이트
app.post('/api/booths', (req, res) => {
    listA = req.body;
    res.json({ message: 'Booth list updated', count: listA.length });
});

// 단일 부스 크롤링
app.post('/api/crawl/single', async (req, res) => {
    try {
        const { booth } = req.body;
        const result = await crawler.crawlBoothInfo(booth);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 전체 부스 크롤링 시작
app.post('/api/crawl/all', async (req, res) => {
    console.log("List", listA)
    try {
        const boothList = listA;
        
        // 비동기적으로 크롤링 시작
        crawler.crawlAllBooths(boothList).then(async (results) => {
            await fs.writeFile('crawled_booths.json', JSON.stringify(results, null, 2), 'utf8');
            console.log('Crawling completed and saved to crawled_booths.json');
        }).catch(error => {
            console.error('Crawling failed:', error);
        });

        res.json({ message: 'Crawling started', count: boothList.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 크롤링 결과 조회
app.get('/api/results', async (req, res) => {
    try {
        const data = await fs.readFile('crawled_booths.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(404).json({ error: 'Results not found' });
    }
});

// 웹 인터페이스 HTML
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>사케 부스 크롤러</title>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .section { margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            button { padding: 10px 20px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; }
            button:hover { background: #0056b3; }
            textarea { width: 100%; height: 200px; margin: 10px 0; }
            pre { background: #f8f9fa; padding: 10px; border-radius: 3px; overflow-x: auto; }
            .status { padding: 10px; margin: 10px 0; border-radius: 3px; }
            .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
            .info { background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; }
        </style>
    </head>
    <body>
        <h1>🍶 사케 페스티벌 부스 크롤러</h1>
        
        <div class="section">
            <h2>1. 부스 리스트 업로드</h2>
            <textarea id="boothList" placeholder='[{"id":"A01","name":"사카야코리아","city":"","description":""}]'>[]</textarea>
            <button onclick="uploadBooths()">부스 리스트 업로드</button>
            <button onclick="loadCurrentBooths()">현재 리스트 불러오기</button>
        </div>

        <div class="section">
            <h2>2. 크롤링 실행</h2>
            <button onclick="startCrawling()">전체 크롤링 시작</button>
            <button onclick="checkResults()">결과 확인</button>
            <div id="status"></div>
        </div>

        <div class="section">
            <h2>3. 결과</h2>
            <pre id="results">결과가 여기에 표시됩니다...</pre>
            <button onclick="downloadResults()">결과 다운로드</button>
        </div>

        <script>
            function showStatus(message, type = 'info') {
                const statusDiv = document.getElementById('status');
                statusDiv.innerHTML = \`<div class="status \${type}">\${message}</div>\`;
            }

            async function uploadBooths() {
                try {
                    const boothData = JSON.parse(document.getElementById('boothList').value);
                    const response = await fetch('/api/booths', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(boothData)
                    });
                    const result = await response.json();
                    showStatus(\`부스 리스트 업로드 완료: \${result.count}개 부스\`, 'success');
                } catch (error) {
                    showStatus(\`업로드 실패: \${error.message}\`, 'error');
                }
            }

            async function loadCurrentBooths() {
                try {
                    const response = await fetch('/api/booths');
                    const booths = await response.json();
                    document.getElementById('boothList').value = JSON.stringify(booths, null, 2);
                    showStatus(\`현재 리스트 불러오기 완료: \${booths.length}개 부스\`, 'success');
                } catch (error) {
                    showStatus(\`불러오기 실패: \${error.message}\`, 'error');
                }
            }

            async function startCrawling() {
                try {
                    showStatus('크롤링을 시작합니다... (시간이 좀 걸릴 수 있습니다)', 'info');
                    const response = await fetch('/api/crawl/all', { method: 'POST' });
                    const result = await response.json();
                    showStatus(\`크롤링 시작됨: \${result.count}개 부스 처리 중...\`, 'success');
                    
                    // 10초마다 결과 확인
                    const checkInterval = setInterval(async () => {
                        try {
                            const resultResponse = await fetch('/api/results');
                            if (resultResponse.ok) {
                                clearInterval(checkInterval);
                                showStatus('크롤링 완료! 결과를 확인하세요.', 'success');
                                checkResults();
                            }
                        } catch (e) {
                            // 아직 완료되지 않음
                        }
                    }, 10000);
                } catch (error) {
                    showStatus(\`크롤링 시작 실패: \${error.message}\`, 'error');
                }
            }

            async function checkResults() {
                try {
                    const response = await fetch('/api/results');
                    if (response.ok) {
                        const results = await response.json();
                        document.getElementById('results').textContent = JSON.stringify(results, null, 2);
                        showStatus(\`결과 불러오기 완료: \${results.length}개 부스\`, 'success');
                    } else {
                        showStatus('아직 결과가 없습니다. 크롤링이 완료되지 않았거나 오류가 발생했습니다.', 'info');
                    }
                } catch (error) {
                    showStatus(\`결과 확인 실패: \${error.message}\`, 'error');
                }
            }

            function downloadResults() {
                const results = document.getElementById('results').textContent;
                if (results && results !== '결과가 여기에 표시됩니다...') {
                    const blob = new Blob([results], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'sake_booths_crawled.json';
                    a.click();
                    URL.revokeObjectURL(url);
                    showStatus('결과 파일 다운로드 완료!', 'success');
                } else {
                    showStatus('다운로드할 결과가 없습니다.', 'error');
                }
            }

            // 페이지 로드시 현재 리스트 불러오기
            window.onload = () => {
                loadCurrentBooths();
            };
        </script>
    </body>
    </html>
    `);
});

// 서버 종료 시 브라우저 정리
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await crawler.closeBrowser();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    await crawler.closeBrowser();
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`
🚀 Sake Booth Crawler Server running on http://localhost:${PORT}

API Endpoints:
- GET  /api/booths        : 현재 부스 리스트 조회
- POST /api/booths        : 부스 리스트 업데이트
- POST /api/crawl/single  : 단일 부스 크롤링
- POST /api/crawl/all     : 전체 부스 크롤링 시작
- GET  /api/results       : 크롤링 결과 조회

사용법:
1. POST /api/booths 로 완성된 부스 리스트 업로드
2. POST /api/crawl/all 로 크롤링 시작
3. GET /api/results 로 결과 확인
    `);
});