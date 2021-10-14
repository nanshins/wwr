import dayjs from "dayjs";
import { VFC } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import useSWR from "swr";
import { Section } from "~/components/section";
import { SEO } from "~/components/seo";
import { WPPost } from "~/lib/api";
import { colors } from "~/styles/colors";

const Article = styled.article`
  max-width: 860px;
  margin: 0 auto;
  padding: 60px;
  background-color: ${colors.white};
`;

const Title = styled.h1`
  font-size: 25px;
  margin-bottom: 20px;
`;

const DateWrapper = styled.div`
  margin-bottom: 20px;
`;

const Date = styled.span`
  font-size: 14px;
  color: ${colors.almostBlack};
  margin-right: 18px;
`;

const Body = styled.div`
  padding: 40px 0;
`;

const Post: VFC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useSWR<WPPost | null>(`/posts/${id}`);

  return (
    <Section backgroundColor={colors.almostWhite}>
      <SEO title={data?.title.rendered} />
      {data && (
        <Article>
          <Title>{data.title.rendered}</Title>
          <DateWrapper>
            <Date>
              {"Posted: "}
              <time dateTime={dayjs(data.date).format("YYYY-MM-DD")}>
                {dayjs(data.date).format("MMM D, YYYY")}
              </time>
            </Date>
            {dayjs(data.date).diff(dayjs(data.modified)) !== 0 && (
              <Date>
                {"Edited: "}
                <time dateTime={dayjs(data.modified).format("YYYY-MM-DD")}>
                  {dayjs(data.modified).format("MMM D, YYYY")}
                </time>
              </Date>
            )}
          </DateWrapper>
          <Body
            dangerouslySetInnerHTML={{
              __html: data.content.rendered
            }}
          />
        </Article>
      )}
    </Section>
  );
};

export { Post };
