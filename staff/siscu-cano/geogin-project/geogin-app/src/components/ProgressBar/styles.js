import styled, { keyframes } from 'styled-components'

export const progressAnimation = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 50px 50px;
  }
`

export const progressBar = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`

export const Progress = styled.div`
    height: 20px;
    position: relative;
    margin: 60px 0 20px 0;
    background: #555;
    border-radius: 25px;
    padding: 10px;
    box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
    max-width: 300px;
    margin: 0 auto;
    box-sizing: content-box;

    div {
        display: block;
        height: 100%;
        border-radius: 20px;
        background-color: rgb(43, 194, 83);
        background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(43, 194, 83)), color-stop(1, rgb(84, 240, 84)));
        background-image: -moz-linear-gradient( center bottom, rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%);
        -webkit-box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.4);
        box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.4);
        position: relative;
        overflow: hidden;
        animation-name: ${progressBar};
        animation-iteration-count: 1;
        animation-duration: ${props => props.duration};
        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-image: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent), color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent));
            background-image: -moz-linear-gradient( -45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
            z-index: 1;
            background-size: 50px 50px;
            animation:  ${progressAnimation} 2s linear infinite;
            border: 20px;
            overflow: hidden;   
    }
}
`
