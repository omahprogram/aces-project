// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session'

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'gaia',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: process.env.SESSION_MAX_AGE,
    },
  })
}
