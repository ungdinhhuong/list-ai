.PHONY: dev prod build clean

# Development
dev:
	docker-compose -f docker-compose.dev.yml up --build

dev-down:
	docker-compose -f docker-compose.dev.yml down

# Production
prod:
	docker-compose -f docker-compose.prod.yml up -d --build

prod-down:
	docker-compose -f docker-compose.prod.yml down

# Build
build-dev:
	docker-compose -f docker-compose.dev.yml build

build-prod:
	docker-compose -f docker-compose.prod.yml build

# Clean
clean:
	docker system prune -f
	docker volume prune -f

# Logs
logs-dev:
	docker-compose -f docker-compose.dev.yml logs -f

logs-prod:
	docker-compose -f docker-compose.prod.yml logs -f

# Database
db-backup:
	docker exec strapi-db-prod mysqldump -u root -p$(MYSQL_ROOT_PASSWORD) $(DATABASE_NAME) > backup.sql

db-restore:
	docker exec -i strapi-db-prod mysql -u root -p$(MYSQL_ROOT_PASSWORD) $(DATABASE_NAME) < backup.sql