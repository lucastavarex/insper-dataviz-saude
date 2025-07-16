import Conclusion from './components/Conclusion'
import Cover from './components/Cover'
import Disease from './components/Disease'
import DiseasesIntroduction from './components/DiseasesIntroduction'
import Footer from './components/Footer'
import ScrollyCards from './components/ScrollyCards'
import Text from './components/Text'

export default function App() {
  return (
    <div className='overflow-x-hidden'>
      <Cover />
      <Text />
      <ScrollyCards />
      <DiseasesIntroduction />
      <Disease />
      <Conclusion />
      <Footer />
    </div>
  )
}