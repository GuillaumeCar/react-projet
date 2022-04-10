import { useState } from 'react';
import { Image, Modal, Header, List, Icon } from "semantic-ui-react";

export default function TeamMemberDetails({ infos }) {

    const [open, setOpen] = useState(false);

    const { name, surname, nickname, favouriteGames, links, description } = infos;

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Image src={'/team/' + name + '.png'} wrapped={true} />}
        >
            <Modal.Header>{name} {surname} - <em>{nickname}</em></Modal.Header>
            <Modal.Content image>
                <Image size='large' src={'/team/' + name + '.png'} wrapped />
                <Modal.Description>
                    <p>{description}</p>

                    <Header as='h3'>Jeux favoris</Header>
                    <List>
                        {
                            favouriteGames.map(game => {
                                return (
                                    <List.Item>
                                        <List.Icon name='game' />
                                        <List.Content>{game}</List.Content>
                                    </List.Item>
                                )
                            })
                        }
                    </List>

                    <Header as='h3'>Les réseaux</Header>
                    <Icon name='twitch' />
                    <span>{links.twitch}</span>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}
