/* eslint react/no-array-index-key: "off" */

import { Components } from 'botframework-webchat-component';
import PropTypes from 'prop-types';
import React, { FC } from 'react';
import type { DirectLineAnimationCard } from 'botframework-webchat-core';

import CommonCard from './CommonCard';
import useStyleSet from '../../hooks/useStyleSet';

const { ImageContent, VideoContent } = Components;

type AnimationCardContentProps = {
  actionPerformedClassName?: string;
  content: DirectLineAnimationCard;
  disabled?: boolean;
};

const AnimationCardContent: FC<AnimationCardContentProps> = ({ actionPerformedClassName = '', content, disabled = undefined }) => {
  const { media = [] } = content;
  const [{ animationCardAttachment: animationCardAttachmentStyleSet }] = useStyleSet();

  return (
    <div className={animationCardAttachmentStyleSet}>
      <ul className="media-list">
        {media.map(({ profile = '', url }, index) => (
          <li key={index}>
            {/\.gif$/iu.test(url) ? <ImageContent alt={profile} src={url} /> : <VideoContent alt={profile} src={url} />}
          </li>
        ))}
      </ul>
      <CommonCard actionPerformedClassName={actionPerformedClassName} content={content} disabled={disabled} />
    </div>
  );
};

AnimationCardContent.propTypes = {
  actionPerformedClassName: PropTypes.string,
  // PropTypes cannot fully capture TypeScript types.
  // @ts-ignore
  content: PropTypes.shape({
    media: PropTypes.arrayOf(
      PropTypes.shape({
        profile: PropTypes.string,
        url: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  disabled: PropTypes.bool
};

export default AnimationCardContent;
