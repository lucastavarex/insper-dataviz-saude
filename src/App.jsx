
import Conclusion from './components/Conclusion'
import Cover from './components/Cover'
import DiabetesMellitus from './components/DiabetesMellitus'
import DiseasesIntroduction from './components/DiseasesIntroduction'
import DoencasCerebrovasculares from './components/DoencasCerebroVasculares'
import DoencasIsquemicasDoCoracao from './components/DoencasIsquemicasDoCoracao'
import Footer from './components/Footer'
import MortalidadeMaterna from './components/MortalidadeMaterna'
import ScrollyCards from './components/ScrollyCards'
import Text from './components/Text'

export default function App() {
  return (
    <>
      <Cover />
      <Text />
      <ScrollyCards />
      <DiseasesIntroduction />
      <DiabetesMellitus />
      <DoencasCerebrovasculares />
      <DoencasIsquemicasDoCoracao />
      <MortalidadeMaterna />
      <Conclusion />
      <Footer />
    </>
  )
}