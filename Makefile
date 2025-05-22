NAME := transcendence
COMPOSE_FILE := ./srcs/docker-compose.yml
COMPOSE_FLAGS := -p $(NAME) -f $(COMPOSE_FILE)
DATA_DIR = /Users/hyunjoo/Dev/app/temp

all: setup up

setup:
	@mkdir -p $(DATA_DIR)

up:
	@docker-compose $(COMPOSE_FLAGS) up --build

down:
	@docker-compose $(COMPOSE_FLAGS) down

# 실행중인 서비스 목록을 보여줌
top :
	@docker-compose $(COMPOSE_FLAGS) top

clean: down

fclean: clean
	@sudo rm -rf $(DATA_DIR)
	@docker system prune -af

re: fclean all

logs:
	@docker-compose $(COMPOSE_FLAGS) logs

config :
	@docker-compose $(COMPOSE_FLAGS) config


.PHONY: all setup up down top clean fclean re logs config