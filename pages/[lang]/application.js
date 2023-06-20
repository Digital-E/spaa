import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { applicationQuery, previewApplicationQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'

import styled from 'styled-components'

import BackgroundDots from '../../components/home/background-dots'
import Form from '../../components/forms/index.js'

const Container = styled.div`
    position: relative;
    display: flex;
    margin-top: 100px;

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const Title = styled.div`
    position: fixed;
    width: 100%;
    top: 150px;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    padding: 0 20px;

    span {
        font-size: 10vw;
        line-height: 1;
        white-space: ${props => props.open ? 'nowrap' : 'initial'}
    }
`


export default function About({ data = {}, preview }) {

  const router = useRouter()

  const slug = data?.applicationData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.applicationData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.applicationData?.content}
          />
        </Head>
        <Title open={data?.applicationData?.applicationOpen}><span>{data?.applicationData?.applicationOpen ? data?.applicationData?.title : data?.applicationData?.applicationClosedMessage}</span></Title>
        <Container>
          <BackgroundDots />
          <Form data={data?.applicationData} />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.lang}__application`

  let applicationData = await getClient(preview).fetch(applicationQuery, {
    slug: slug,
  })

  if(preview) {
    applicationData = await getClient(preview).fetch(previewApplicationQuery, {
      slug: slug,
    })
  }


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
        applicationData,
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
