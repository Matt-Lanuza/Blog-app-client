import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';
import MissionVisionGoals from '../components/MissionVisionGoals';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="flex-grow-1">
        <Banner />
        <MissionVisionGoals />
      </Container>
      <Footer />
    </div>
  );
}