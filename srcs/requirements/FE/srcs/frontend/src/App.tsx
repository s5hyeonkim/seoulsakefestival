import React, { useState } from 'react';
import { ChevronLeft, MapPin, Info } from 'lucide-react';
import { Brewery, breweryData, Page, Section } from './data';


const BreweryApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [selectedSection, setSelectedSection] = useState<Section | ''>('');
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null);

  const sections: Section[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  const handleSectionClick = (section: Section): void => {
    setSelectedSection(section);
    setCurrentPage('section');
  };

  const handleBreweryClick = (brewery: Brewery): void => {
    setSelectedBrewery(brewery);
    setCurrentPage('detail');
  };

  const handleBack = (): void => {
    if (currentPage === 'detail') {
      setCurrentPage('section');
      setSelectedBrewery(null);
    } else if (currentPage === 'section') {
      setCurrentPage('main');
      setSelectedSection('');
    }
  };

  // Main Page Component
  const MainPage: React.FC = () => (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>🍶 Brewery Guide</h1>
          <p style={styles.subtitle}>Select a section to explore breweries</p>
        </div>
        
        <div style={styles.grid}>
          {sections.map((section: Section) => (
            <button
              key={section}
              onClick={() => handleSectionClick(section)}
              style={styles.sectionButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
            >
              <div style={styles.sectionContent}>
                <div style={styles.sectionLetter}>
                  {section}
                </div>
                <div style={styles.sectionLabel}>
                  Section {section}
                </div>
                <div style={styles.sectionCount}>
                  {breweryData[section]?.length || 0} breweries
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Section Page Component
  const SectionPage: React.FC = () => {
    const currentBreweries = selectedSection ? breweryData[selectedSection] : [];

    return (
      <div style={styles.container}>
        <div style={styles.navbar}>
          <div style={styles.navbarContent}>
            <button
              onClick={handleBack}
              style={styles.backButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <ChevronLeft size={24} color="#4b5563" />
            </button>
            <h2 style={styles.navTitle}>
              Section {selectedSection}
            </h2>
          </div>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.breweryList}>
            {currentBreweries.map((brewery: Brewery) => (
              <button
                key={brewery.id}
                onClick={() => handleBreweryClick(brewery)}
                style={styles.breweryButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                }}
              >
                <div style={styles.breweryContent}>
                  <div style={styles.breweryInfo}>
                    <h3 style={styles.breweryName}>
                      {brewery.name}
                    </h3>
                    <p style={styles.breweryLocation}>
                      <MapPin size={14} style={{ marginRight: '4px' }} />
                      {brewery.city || 'Location not specified'}
                    </p>
                    <p style={styles.breweryId}>
                      ID: {brewery.id}
                    </p>
                  </div>
                  <ChevronLeft size={20} color="#9ca3af" style={{ transform: 'rotate(180deg)' }} />
                </div>
              </button>
            ))}
          </div>

          {(!currentBreweries || currentBreweries.length === 0) && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🍶</div>
              <p style={styles.emptyText}>No breweries found in this section</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Detail Page Component
  const DetailPage: React.FC = () => {
    if (!selectedBrewery) return null;

    return (
      <div style={styles.container}>
        <div style={styles.navbar}>
          <div style={styles.navbarContent}>
            <button
              onClick={handleBack}
              style={styles.backButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <ChevronLeft size={24} color="#4b5563" />
            </button>
            <h2 style={styles.navTitle}>
              {selectedBrewery.name}
            </h2>
          </div>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.detailCard}>
            <div style={styles.detailHeader}>
              <div style={styles.detailIcon}>🍶</div>
              <h1 style={styles.detailTitle}>
                {selectedBrewery.name}
              </h1>
              <p style={styles.detailLocation}>
                <MapPin size={16} style={{ marginRight: '4px' }} />
                {selectedBrewery.city || 'Location not specified'}
              </p>
            </div>

            <div style={styles.detailSections}>
              <div style={styles.detailSection}>
                <h3 style={styles.detailSectionTitle}>
                  <Info size={16} style={{ marginRight: '8px' }} />
                  Brewery ID
                </h3>
                <p style={styles.detailSectionText}>{selectedBrewery.id}</p>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.detailSectionTitle}>Description</h3>
                <p style={styles.detailSectionText}>
                  {selectedBrewery.description || 'No description available yet.'}
                </p>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.detailSectionTitle}>Section</h3>
                <p style={styles.detailSectionText}>Section {selectedSection}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render current page
  if (currentPage === 'main') return <MainPage />;
  if (currentPage === 'section') return <SectionPage />;
  if (currentPage === 'detail') return <DetailPage />;

  return null;
};

// CSS Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  wrapper: {
    maxWidth: '448px',
    margin: '0 auto',
    padding: '16px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    paddingTop: '32px',
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#4b5563',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  sectionButton: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: '24px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  sectionContent: {
    textAlign: 'center',
  },
  sectionLetter: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: '8px',
  },
  sectionLabel: {
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '4px',
  },
  sectionCount: {
    fontSize: '12px',
    color: '#6b7280',
  },
  navbar: {
    position: 'sticky' as const,
    top: 0,
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    zIndex: 10,
  },
  navbarContent: {
    maxWidth: '448px',
    margin: '0 auto',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
  },
  backButton: {
    marginRight: '12px',
    padding: '8px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
  },
  navTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  breweryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  breweryButton: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    padding: '16px',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'box-shadow 0.2s ease-in-out',
  },
  breweryContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breweryInfo: {
    flex: 1,
  },
  breweryName: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px',
    margin: '0 0 4px 0',
  },
  breweryLocation: {
    fontSize: '14px',
    color: '#4b5563',
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 4px 0',
  },
  breweryId: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
  emptyState: {
    textAlign: 'center',
    paddingTop: '48px',
    paddingBottom: '48px',
  },
  emptyIcon: {
    fontSize: '18px',
    color: '#9ca3af',
    marginBottom: '8px',
  },
  emptyText: {
    color: '#6b7280',
    margin: 0,
  },
  detailCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: '24px',
  },
  detailHeader: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  detailIcon: {
    fontSize: '60px',
    marginBottom: '16px',
  },
  detailTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
    margin: '0 0 8px 0',
  },
  detailLocation: {
    color: '#4b5563',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  detailSections: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  detailSection: {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '16px',
  },
  detailSectionTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 8px 0',
  },
  detailSectionText: {
    color: '#4b5563',
    margin: 0,
  },
};

export default BreweryApp;