import Image from 'next/image';

interface TechIconProps {
  src: string;
  text: string;
}

function TechIcon({ src, text }: TechIconProps) {
  return (
    <figure className="image is-48x48 is-inline-flex">
      <Image src={src} alt={text} layout="fill" placeholder="empty" />
    </figure>
  );
}

export default TechIcon;
