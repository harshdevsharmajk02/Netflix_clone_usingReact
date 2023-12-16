import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ReactDOM from 'react-dom';
import YouTube from "react-youtube";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Trailer(location) {

    const[trailerView,setTrailerView] = useState([])


    const showTrailer = () => {
        fetch(`https://api.themoviedb.org/3/${location.state?.movie.id}/videos?api_key=6a779e2f0dc326f0cbb66a0b937fef9e&language=en-US`)
            .then(res => res.json())
            .then(json => console.log(json[0]?.results))
    }

    useEffect(() => {
        showTrailer()
    }, [])
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {

        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <Button variant='contained' sx={{ color: "black", bgcolor: "white" }} onClick={openModal}>PLAY TRAILER</Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                <YouTube  videoId={trailerView}/>
            </Modal>
        </div>
    );
}

export default Trailer;
