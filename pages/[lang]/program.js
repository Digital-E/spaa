import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { programQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'

import styled from 'styled-components'

import Body from "../../components/body"

const Container = styled.div`
    display: flex;
    margin-top: 100px;

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const Title = styled.div`
    text-align: center;

    span {
        font-size: 10vw;
        line-height: 1;
    }
`

const Col = styled.div`
    padding: 20px;

    :nth-child(1) {
        flex-basis: 35%;
        padding-left: 0;
    }

    :nth-child(2) {
        flex-basis: 35%;
        padding-left: 0;
    }

    > div {
        width: 80%;
    }

    :nth-child(3) {
        flex-basis: 20%;
    }

    @media(max-width: 989px) {
        > div {
            width: 100%;
        }

        :nth-child(3) {
            margin-left: 0;
            padding-left: 0;
        }
    }
`

export default function About({ data = {}, preview }) {

  const router = useRouter()

  const slug = data?.programData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.programData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.programData?.content}
          />
        </Head>
        <Title><span>{data?.programData?.title}</span></Title>
        <Container>
            <Col>
                <div>
                    <Body content={data?.programData?.textcolumnone} />
                </div>
            </Col>
            <Col>
                <div>
                    <Body content={data?.programData?.textcolumntwo} />
                </div>
            </Col>
            <Col>
                <div>
                    <Body content={data?.programData?.textcolumnthree} />
                </div>
            </Col>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.lang}__program`

  const programData = await getClient(preview).fetch(programQuery, {
    slug: slug,
  })


  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery, {
    lang: params.lang
  });

  const footerData = await getClient(preview).fetch(footerQuery, {
    lang: params.lang
  });

  return {
    props: {
      preview,
      data: {
        programData,
        // news,
        // events,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
  const paths = ['de', 'fr', 'it', 'en'];

  return {
    paths: paths.map((lang) => ({ params: { lang } })),
    fallback: false,
  }
}
