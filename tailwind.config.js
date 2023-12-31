/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/enterprise/**/*.{js,ts,jsx,tsx}",
    "./app/admin/**/*.{js,ts,jsx,tsx}",
    "./app/core/components/navbar/Navbar*.{js,ts,jsx,tsx}",
    "./app/core/components/drawer**/*.{js,ts,jsx,tsx}",
    "./app/core/components/input**/*.{js,ts,jsx,tsx}",
    "./app/core/components/card**/*.{js,ts,jsx,tsx}",
    "./app/core/components/slider**/*.{js,ts,jsx,tsx}",
    "./app/core/components/sidebar/EnterpriseSidebar*.{js,ts,jsx,tsx}",
    "./app/core/components/sidebar/Sidebar*.{js,ts,jsx,tsx}",
    "./app/core/components/drawer/**/*.{js,ts,jsx,tsx}",
    "./app/enterprise/components/**/*.{js,ts,jsx,tsx}",
    "./app/dashboard/components/**/*.{js,ts,jsx,tsx}",
    "./app/admin/components/**/*.{js,ts,jsx,tsx}",
    "./app/dashboard/components/table**/*.{js,ts,jsx,tsx}",
    "./app/company/components/TemplateVersion*.{js,ts,jsx,tsx}",
    "./app/company/components/buttons/**/*.{js,ts,jsx,tsx}",
    "./app/core/components/dropdown/Select*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
