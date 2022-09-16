import styled from "styled-components"
import Image from "../image"

let Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
`

const Media = styled.div`
    padding: 10px;
    flex-basis: 50%;
`



export default function Component ({ data }) {

    return (
        <Container>
            {
            data?.map(item => {
                return <Media><Image data={item}  hasCaption={true} /></Media>
            })
            }
        </Container>       
    )
}