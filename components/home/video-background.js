
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
    margin-top: 50px;

    video {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .hide-desktop-video {
        opacity: 0;
    }

    @media(min-width: 768px) {
        display: none;
    }
`

const Tablet = styled.div`
    height: 100%;
    width: 100%;
    margin-top: 50px;

    video {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .hide-desktop-video {
        opacity: 0;
    }

    @media(max-width: 767px) {
        display: none;
    }  
    
    @media(min-width: 989px) {
        display: none;
    }
`

const Desktop = styled.div`
    height: 100%;
    width: 100vw;

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

        if(platform === 'tablet') {
            document.querySelector('.hide-tablet-video').classList.remove('hide-tablet-video')
        }

        if(platform === 'desktop') {
            document.querySelector('.hide-desktop-video').classList.remove('hide-desktop-video')
        }
    }

    return (
        <Container>
            <Mobile>
                <video muted playsInline autoPlay loop preload="auto" className='hide-mobile-video' onLoadedData={() => hasLoaded('mobile')}>
                    <source src='/videos/SPAA_2024_portrait.mp4' type='video/mp4' />
                </video>
            </Mobile>
            <Tablet>
            <video muted playsInline autoPlay loop preload="auto" className='hide-tablet-video' onLoadedData={() => hasLoaded('tablet')}>
                <source src='/videos/SPAA_2024_square.mp4' type='video/mp4' />
            </video>                
            </Tablet>
            <Desktop>
                <video muted playsInline autoPlay loop preload="auto" className='hide-desktop-video' onLoadedData={() => hasLoaded('desktop')}>
                    <source src='/videos/SPAA_2024_paysage.mp4' type='video/mp4' />
                </video>
            </Desktop>
        </Container>
    )
}