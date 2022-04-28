import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import React, {useState} from "react"
// import FunctionContextComponent from "../FunctionContextComponent"
import ClassContextComponent from "../ClassContextComponent"

import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
export const ThemeContext = React.createContext()


export default function Post({ postData }) {
  const [darkTheme, setDarkTheme] = useState(true)

  function toggleTheme(){
    setDarkTheme(prevDarkTheme => !prevDarkTheme)
  }
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <>
      <ThemeContext.Provider value={darkTheme}>
        <button onClick={toggleTheme}>Toggle theme! click me</button>
        {/* <FunctionContextComponent /> */}
        <ClassContextComponent />
      </ThemeContext.Provider>
      
      </>



      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}