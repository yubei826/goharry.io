import React from "react";
import Link from "gatsby-link";
import Header from "../components/Header";
import Section from "../components/Section";
import List, { Item } from "../components/List";
import styled from "styled-components";
import Record from "../components/Record";
import TextBox from "../components/TextBox";
import DownloadLink from "../components/DownloadLink";
import Container from "../components/Container";

const DownloadBox = styled.div`
  text-align: center;
  padding-bottom: 2rem;
  @media (min-width: 700px) {
    padding-left: 25%;
  }
`;

const IndexPage = ({ data }) => {
  const resumes = data.allDataJson.edges;
  const resume = resumes.find(r => r.node.language === "zh");
  const { basics, education, languages, skills, projects, work } = resume.node;
  return (
    <div>
      <Header {...basics} />
      <Section title="联系方式">
        <List>
          <Item label="邮箱">{basics.email}</Item>
          <Item label="电话">{basics.phone}</Item>
          <Item label="网站">
            <a href={basics.website}>{basics.website}</a>
          </Item>
        </List>
      </Section>
      <Section title="自我介绍">
        <TextBox>{basics.summary}</TextBox>
      </Section>
      <Section title="社交网络">
        <List>
          {basics.profiles.map((profile, idx) => (
            <Item label={profile.network} key={idx}>
              <a href={profile.url}>{profile.username}</a>
            </Item>
          ))}
        </List>
      </Section>
      <Section title="工作经历">
        {work.map(work => (
          <Record {...work} title={work.company} key={work.website} />
        ))}
      </Section>
      <Section title="项目经历">
        {projects.map(project => (
          <Record {...project} title={project.name} key={project.website} />
        ))}
      </Section>
      <Section title="教育经历">
        {education.map((e, index) => (
          <Record {...e} title={e.institution} key={index} position={e.area} />
        ))}
      </Section>
      <Container>
        <DownloadBox>
          <DownloadLink />
        </DownloadBox>
      </Container>
    </div>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query jsonQuery {
    allDataJson {
      edges {
        node {
          language
          basics {
            name
            label
            email
            phone
            website
            summary
            location {
              city
            }
            profiles {
              network
              username
              url
            }
          }
          work {
            company
            position
            website
            startDate
            endDate
            summary
            highlights
          }
          projects {
            name
            position
            website
            startDate
            endDate
            summary
            highlights
          }
          education {
            institution
            area
            studyType
            startDate
            endDate
          }
          skills {
            name
            level
            keywords
          }
          languages {
            language
            fluency
          }
        }
      }
    }
  }
`;
