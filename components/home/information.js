
import styled from "styled-components"


const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 10px 20px;
    z-index: 999;
    background: white;
    border: 1px solid black;

    a {
        display: block;
        margin-top: 10px;
        width: fit-content;
    }

    @media(max-width: 989px) {
        bottom: 50px;

        p {
            font-size: 14px;
        }
    }
`



export default ({ data }) => {


    return (
        <Container>
            <div 
                dangerouslySetInnerHTML={{__html:
                    `
                    <p>
                    Bitte nehmen Sie folgende Information zur Kenntnis: <br/>
                    Please take note of the following information: <br/>
                    Nous vous prions de prendre note de l'information suivante : <br/>
                    Si prega di prendere nota delle seguenti informazioni: <br/>
                    <a href='https://www.amtsblatt.bl.ch/#!/search/publications/detail/a81472c5-a804-48e7-b137-b9b0e4185793' target='_blank'>🔗</a>
                    </p>
                    `
                }}
            />
        </Container>
    )
}