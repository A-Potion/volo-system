import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface MagicMailProps {
  url?: string;
}


export const MagicMail = ({
  url,
}: MagicMailProps) => (
  <Html>
    <Head />
    <Preview>Magic link inside</Preview>
    <Body>
      <Container>
        <Heading>Login</Heading>
        <Button
        className="box-border w-full rounded-[8px] bg-indigo-600 px-[12px] py-[12px] text-center font-semibold text-white"
        href={url}
        >
        Click to log in
        </Button>
        <Text>
            Or paste {url} into your browser.
        </Text>
      </Container>
    </Body>
  </Html>
);


export default MagicMail;