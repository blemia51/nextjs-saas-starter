import * as React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Hr,
  Button,
  Img,
} from '@react-email/components'

export default function MagicLinkEmail({ url }: { url: string }) {
  return (
    <Html lang="en">
      <Head />
      <Body style={{ backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
        <Container
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 8,
            padding: '40px',
            margin: '40px auto',
            maxWidth: 600,
            textAlign: 'center',
          }}
        >
          <Img
            src="https://res.cloudinary.com/dx8jbju8t/image/upload/v1744812856/elmzl1ob6jc9ggkhjxv1.png"
            alt="SaaS Starter Logo"
            width="128"
            style={{ margin: '0 auto 24px', display: 'block' }}
          />

          <Heading as="h2">🔐 Sign in to SaaS Starter</Heading>

          <Text style={{ fontSize: 16 }}>
            Click the button below to sign in securely:
          </Text>

          <Button
            href={url}
            style={{
              display: 'inline-block',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              padding: '12px 24px',
              fontWeight: 'bold',
              fontSize: 14,
              borderRadius: 6,
              textDecoration: 'none',
              marginTop: 24,
            }}
          >
            Sign in now
          </Button>

          <Hr style={{ margin: '32px 0' }} />

          <Text style={{ fontSize: 12, color: '#6b7280' }}>
            This link is valid for 10 minutes.<br />
            If you didn’t request this email, you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
