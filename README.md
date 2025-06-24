# Fertile Crescent E-commerce Platform

An e-commerce platform for traditional products from Fertile Crescent countries with country-based categorization and role-based user management.

## Features

- **Country-Based Categorization**: Products categorized by country of origin (Egypt, Lebanon, Palestine, Cyprus, Syria, Iraq, and Jordan)
- **Role-Based Access**: Different privileges for regular users and administrators
- **Product Management**: Browse, search, and filter products by country, category, price, etc.
- **Shopping Cart**: Add products to cart, update quantities, and proceed to checkout
- **User Accounts**: Register, login, manage profile, view order history
- **Admin Dashboard**: Manage products, users, orders, and more (admin-only)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session-based auth
- **Routing**: wouter for client-side routing
- **State Management**: TanStack Query for server state, Context API for client state

## Installation and Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (optional - can use SQLite for local development)

### Option 1: Quick Setup (with Setup Script)

1. Clone the repository
2. Run the setup script:

```bash
node setup-local.js
```

The script will guide you through:
- Setting up environment variables
- Installing dependencies
- Setting up the database (PostgreSQL or SQLite)
- Seeding the database with sample data

### Option 2: Manual Setup

1. Clone the repository
2. Create a `.env` file in the root directory with the following contents:

```
# For PostgreSQL
DATABASE_URL=postgres://username:password@localhost:5432/fertile_crescent

# Or for SQLite
# DATABASE_URL=file:./fertile_crescent.db
# USE_SQLITE=true

# Session secret (replace with a secure random string)
SESSION_SECRET=your_session_secret
```

3. Install dependencies:

```bash
npm install
```

4. Push the database schema:

```bash
npm run db:push
```

5. Seed the database:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

## Running on Linux Mint

1. Install Node.js and npm (newer version is recommended):

```bash
# Install curl if not already installed
sudo apt update
sudo apt install curl

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Reload shell configuration
source ~/.bashrc

# Install latest stable Node.js version
nvm install 18
nvm use 18
nvm alias default 18
```

2. Choose your database option:

**Option A: Use SQLite** (Recommended for quick setup)
- No additional installation required
- The setup script will configure SQLite automatically

**Option B: Use PostgreSQL**
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql -c "CREATE USER fertile_user WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "CREATE DATABASE fertile_crescent OWNER fertile_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE fertile_crescent TO fertile_user;"
```

3. Clone the repository and navigate into the project directory:
```bash
git clone <repository-url>
cd <repository-directory>
```

4. Run the setup script and follow the prompts:
```bash
node setup-local.js
```

5. Start the server:
```bash
npm run dev
```

6. Access the application at http://localhost:5000

## Default Users

After seeding the database, you can log in with the following credentials:

- **Admin User**
  - Username: admin
  - Password: Password123!

- **Regular User**
  - Username: user
  - Password: Password123!

## Available Scripts

- `npm run dev`: Start the development server
- `npm run db:push`: Push the database schema to the database
- `npm run db:seed`: Seed the database with sample data

## Screenshots

(Coming soon)

## License

MIT
