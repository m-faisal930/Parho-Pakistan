
import NavBar from '../components/NavBar'
import Hero from '../components/Hero/Hero'
import NavbarWithScroll from '../components/NavbarWithScroll'
import StatsCounter from '../components/StateCounter'
import Footer from '../components/Footer'
import Suggestions from '../components/Suggestions'
import BackToTopButton from '../components/BackToTopButton'
import AiAssistant from '../components/AiAssistant'
import ChatbotIcon from '../components/ChatbotIcon'


export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Suggestions Heading={'Find the Popular Cases and Donate Them'} />
      <NavbarWithScroll />
      <StatsCounter />
      {/* <AiAssistant /> */}
<ChatbotIcon />
<BackToTopButton />
      <Footer />
    </div>
  );
}
