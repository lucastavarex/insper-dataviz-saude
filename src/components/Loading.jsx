import coverImage from '../assets/cover.png'
import insperLogo from '../assets/insper-logo.png'

export default function Loading() {
  return (
    <div 
      className="h-screen bg-cover flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${coverImage})`,
        overflow: 'hidden !important'
      }}
    >
      {/* Insper logo/text at the top */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
        <img src={insperLogo} alt="Insper Logo" className="h-9" />
      </div>

      {/* Loading content centered */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 text-center max-w-[1000px]">
        <div className="text-white text-xl md:text-2xl lg:text-2xl font-bold mb-8">
          Carregando...
        </div>
      </div>
    </div>
  )
}
