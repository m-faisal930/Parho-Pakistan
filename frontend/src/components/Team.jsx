import {
  Card,
  CardBody,
  Avatar,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import img1 from "../assets/images/t1.png"
import img2 from "../assets/images/t2.png"
import img3 from "../assets/images/t3.jpeg"
import img4 from "../assets/images/dp.png"

function TeamCard({ img, name, title }) {
  return (
    <Card className="rounded-lg bg-[#FAFAFA]" shadow={false}>
      <CardBody className="text-center">
        <Avatar
          src={img}
          alt={name}
          variant="circular"
          size="xxl"
          className="mx-auto mb-6 object-top"
        />
        <Typography
          variant="h5"
          color="blue-gray"
          className="!font-medium text-lg"
        >
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-2 !text-base !font-semibold text-gray-600"
        >
          {title}
        </Typography>
        <div className="flex items-center justify-center gap-1.5">
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-twitter text-lg" />
          </IconButton>
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-linkedin text-lg" />
          </IconButton>
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-dribbble text-lg" />
          </IconButton>
        </div>
      </CardBody>
    </Card>
  );
}

const members = [
  {
    img: img1,
    name: 'Dr. Khawar Khurshid',
    title: 'Education Specialist',
  },
  {
    img: img2,
    name: 'Sonia Safeer',
    title: 'Program Manager',
  },
  {
    img: img3,
    name: 'Muhammad Faisal',
    title: 'Developer',
  },
  {
    img: img4,
    name: 'Kashif Khan',
    title: 'Developer',
  },
];

export function Team() {
  return (
    <section className="min-h-screen py-8 px-8 lg:py-28">
      <div className="container mx-auto">
        <div className="mb-16 text-center lg:mb-28">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mt-1 !text-2xl lg:!text-4xl"
          >
            Meet Our Parho Pakistan Team
          </Typography>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
