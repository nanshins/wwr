import { VFC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import { WPMedia, WPPost } from "~/lib/api";
import { colors } from "~/styles/colors";
import { keyframes } from "~/styles/variables";

type HomePostProps = {
  post: WPPost;
};

const Root = styled.div`
  position: relative;
  animation: ${keyframes.fadein} 200ms ease;
`;

const LinkContainer = styled(Link)`
  display: block;
  color: #484848;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 52.25%;
  overflow: hidden;
  background-color: ${colors.blue};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.75)
    );
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 24px;
  max-width: calc(100% - 40px);
  margin-top: 20px;
`;

const Excerpt = styled.div`
  font-size: 15px;
  margin-top: 10px;
`;

const HomePost: VFC<HomePostProps> = ({ post }) => {
  const { data } = useSWR<WPMedia | null>(
    post.featured_media ? `/media/${post.featured_media}` : null
  );
  return (
    <Root>
      <LinkContainer to={`/posts/${post.id}`}>
        <ImageWrapper>
          {data && (
            <Image
              src={data.source_url}
              alt={data.alt_text}
              decoding="async"
              loading="lazy"
            />
          )}
        </ImageWrapper>
      </LinkContainer>
      <Title>{post.title.rendered}</Title>
      <Excerpt
        dangerouslySetInnerHTML={{
          __html: post.excerpt.rendered
        }}
      />
    </Root>
  );
};

export { HomePost };
