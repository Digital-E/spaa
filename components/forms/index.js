import { useState } from "react"
import styled, { keyframes } from "styled-components";

import Form from './forms/form'


const Container = styled.div`
    width: 70%;
    margin: 0 auto 100px auto;
    background: white;
    border: 1px solid black;
    box-shadow: 10px 10px 10px rgb(0 0 0 / 70%);
    padding: 40px;

    button {
        margin: 40px 0 0 0;
    }

    @media(max-width: 989px) {
      width: 100%;
      padding: 20px;
    }
`

const Title = styled.p`
    margin: 30px auto;
    width: fit-content;
`

const Download = styled.div`
    display: flex;
    margin: 30px auto 50px auto;
    width: fit-content;

    > div {
      display: flex;
      flex-direction: column;
    }

    a {
      margin: 0 0 0 5px;
    }

    p {
      margin: 0;
    }
`



const Component = ({ data }) => {

  let [hasSubmitted, setHasSubmitted] = useState(false)

  function forceDownload(blob, filename) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
  }  

  // Current blob size limit is around 500MB for browsers
  function downloadResource(url, filename) {
    if(url === null) return
    if (!filename) filename = url.split('\\').pop().split('/').pop();
    fetch(url, {
        headers: new Headers({
          'Origin': location.origin
        }),
        mode: 'cors'
      })
      .then(response => response.blob())
      .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        forceDownload(blobUrl, filename);
      })
      .catch(e => console.error(e));
  }  

  return (
      data?.applicationOpen ?
      <Container>
        {
          !hasSubmitted ?
            <>
              <Download>
                <p>{data.downloadLabelOne}</p> 
                <div>
                  <a onClick={()=>downloadResource(data.download, data.downloadLabelTwo)}>{data.downloadLabelTwo}</a>
                  <a onClick={()=>downloadResource(data.downloadTwo, data.downloadLabelThree)}>{data.downloadLabelThree}</a>
                  <a onClick={()=>downloadResource(data.downloadThree, data.downloadLabelFour)}>{data.downloadLabelFour}</a>
                </div>
              </Download>
              <Title>{data.subtitleOne}</Title>
              <Form data={data} hasSubmitted={() => setHasSubmitted(true)}/>
            </>
          :
            <Title>{data.confirmationMessage}</Title>
        }
      </Container>
      :
      null
  );
};

export default Component
