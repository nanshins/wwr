import { Fragment, VFC } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { HomePost } from "~/components/home-post";
import { Section } from "~/components/section";
import { SEO } from "~/components/seo";
import { WPPost } from "~/lib/api";

const ModifiedSection = styled(Section)`
  max-width: 1600px;
  margin: 0 auto;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
`;

const ListItem = styled.li`
  width: calc(100% / 3 - 8px);
  margin-right: 12px;
  margin-bottom: 12px;

  &:nth-child(3n) {
    margin-right: 0;
  }

  @media (max-width: 767px) {
    width: calc(50% - 6px);

    &:nth-child(3n) {
      margin-right: 12px;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media (max-width: 540px) {
    width: 100%;
    margin-right: 0 !important;
  }
`;

const Homepage: VFC = () => {
  const { data } = useSWR<WPPost[]>("/posts?per_page=5");
  return (
    <Fragment>
      <SEO title="Hello wordpress!" />
      <ModifiedSection>
        {data && <HomePost post={data[0]} />}
        {data && data.length > 1 && (
          <List>
            {data.map((post, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <ListItem key={`${post.id}[${index}]`}>
                  <HomePost post={post} />
                </ListItem>
              );
            })}
          </List>
        )}
      </ModifiedSection>
    </Fragment>
  );
};

export { Homepage };
