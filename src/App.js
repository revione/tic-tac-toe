import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { GlobalStyles } from './components/globalStyle'
import AppProvider from './context'

const App = () => (
  <AppProvider>
    <GlobalStyles />
    <Header />
    <Main />
    <Footer />
  </AppProvider>
)

export default App
