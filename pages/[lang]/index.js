import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { indexQuery, indexEventsQuery, homeQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'


// Components
import Overlay from "../../components/home/background-dots"
import Carousel from "../../components/home/carousel"
import DrawingTool from "../../components/home/drawing-tool"


export default function Index({ data = {}, preview }) {
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)

  // let [allEvents, setAllEvents] = useState([]);
  const router = useRouter()

  const slug = data?.homeData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {

    document.querySelector("body").classList.add("body-lock");

    return () => {
      document.querySelector("body").classList.remove("body-lock");
    }

  }, []);


  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.homeData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.homeData?.content}
          />
        </Head>
        <Overlay />
        <Carousel />
        <DrawingTool />
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {
  // const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  // return {
  //   props: { allPosts, preview },
  // }

  let slug = params.lang

  const homeData = await getClient(preview).fetch(homeQuery, {
    slug: slug,
  })

  // const news = await getClient(preview).fetch(indexQuery, {
  //   slug: slug
  // });

  // const events = await getClient(preview).fetch(indexEventsQuery, {
  //   slug: slug
  // });

  // // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery, {
    lang: params.lang
  });

  // const footerData = await getClient(preview).fetch(footerQuery, {
  //   lang: params.lang
  // });

  return {
    props: {
      preview,
      data: {
        homeData,
        // news,
        // events,
        menuData,
        // footerData
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
