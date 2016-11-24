import * as React from 'react';
import Container from '../components/container';

interface IIndexPageProps extends React.Props<any> {};

export default function IndexPage(props: IIndexPageProps) {
return (
    <Container size={4} center>
      <h2 className="caps">Index</h2>
      <p>
       this is IndexPage
      </p>
    </Container>
  );
}
