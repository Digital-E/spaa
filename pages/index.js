import { useEffect } from "react"
import router, { useRouter } from "next/router"

export default function Index({}) {
    useEffect(() => {
        let lang = window.navigator.language
        if(lang === "en-GB") {
            router.replace("/en")
        } else if (lang === "fr-FR") {
            router.replace("/fr")
        } else {
            router.replace("/de")
        }
    },[])

    return null
  }