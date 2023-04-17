// THIS PAGE WAS BEING MADE IN ORDER TO LEARN THE CREATE ROOM AND JOIN ROOM TRICKS BY TAKING ONLINE HELP FROM OTHER WORK.

'use strict'

import React from 'react'
import Head from 'next/head'
import { Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class PageLayout extends React.Component {
  render () {
    const { title, children, ...rest } = this.props
    return (
      <div {...rest}>
        <Head>
          <title>{title}</title>
          <meta name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        </Head>
        <Container>
          { children }
        </Container>
        <style jsx global>{`
          body {
            margin-top: 2em;
            color: #333333;
          }
          .spy, .resistance {
            font-weight: bold
          }

          .spy {
            color: #000000;
          }

          .resistance {
            color: #F2152B;
          }
        `}</style>
      </div>
    )
  }
}