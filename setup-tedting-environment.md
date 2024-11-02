To run a .tsx (TypeScript React) file, you'll need to set up a React + TypeScript development environment. Here's a quick way to do it using Vite:

Create a new Vite project with React and TypeScript:

```bash
npm create vite@latest my-election-app -- --template react-ts
```
Navigate to the project directory:

```bash
cd my-election-app
```

Install dependencies:

```bash
npm install
```
Install the required packages for our component:

```bash
npm install lucide-react
```

Create a new file src/components/ElectionDashboard.tsx and paste the component code I provided
Update src/App.tsx to use the component:

```tsx
import ElectionDashboard from './components/ElectionDashboard'

function App() {
  return (
    <div>
      <ElectionDashboard />
    </div>
  )
}

export default App
```

Run the development server:

```bash
npm run dev
```
Open the URL shown in your terminal (usually http://localhost:5173)

Would you like me to simplify the component or help with setting up the development environment?
