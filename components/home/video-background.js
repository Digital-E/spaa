
import { useEffect } from "react"
import styled from "styled-components"


const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    max-width: 1800px;
    z-index: -1;
    top: 50%;
    left: 50%;  
    transform: translate(-50%, -50%);
    box-sizing: border-box;

    video {
        transition: opacity 0.3s;
    }
`
const Mobile = styled.div`
    height: 100%;
    width: 100%;

    video {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .hide-desktop-video {
        opacity: 0;
    }

    @media(min-width: 990px) {
        display: none;
    }
`

const Desktop = styled.div`
    height: 100%;
    width: 100%;

    video {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .hide-mobile-video {
        opacity: 0;
    }

    @media(max-width: 989px) {
        display: none;
    }
`



export default ({ data }) => {

    useEffect(() => {

    }, [])

    const hasLoaded = (platform) => {
        if(platform === 'mobile') {
            document.querySelector('.hide-mobile-video').classList.remove('hide-mobile-video')
        }

        if(platform === 'desktop') {
            document.querySelector('.hide-desktop-video').classList.remove('hide-desktop-video')
        }
    }

    return (
        <Container>
            <Mobile>
                <video muted playsInline autoPlay loop className='hide-mobile-video' onLoadedData={() => hasLoaded('mobile')}>
                    <source src='/videos/mobile.mp4' type='video/mp4' />
                </video>
            </Mobile>
            <Desktop>
                <video muted playsInline autoPlay loop className='hide-desktop-video' onLoadedData={() => hasLoaded('desktop')}>
                    <source src='/videos/desktop.mp4' type='video/mp4' />
                </video>
            </Desktop>
        </Container>
    )
}