import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';

const StyledIconButton = styled.div`
    cursor: pointer;

    &:hover {
        color: blue;
    }
`;

type IconButtonProps = {
    name: IconDefinition; 
    onClick: (e: any) => void;
}

function IconButton({name, onClick}: IconButtonProps) {
    return (
        <StyledIconButton onClick={(e) => onClick(e)}>
            <FontAwesomeIcon icon={name} />
        </StyledIconButton>
    )
}

export default IconButton;