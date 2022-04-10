import { useState } from 'react';
import { Modal, Image } from 'semantic-ui-react'
import './ImageThumbnail.css'

export default function ImageThumbnail({ image }) {
    const [open, setOpen] = useState(false)
    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Image className="modal-thumbnail" src={image} size="small" />}
        >
            <Modal.Content>
                <Image size="massive" src={image} wrapped />
            </Modal.Content>
        </Modal>
    );
}
