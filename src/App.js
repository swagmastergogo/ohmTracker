import "./App.css";
import ParticleBackground from "./ParticleBackground";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/drondin/olympus-graph',
  cache: new InMemoryCache()
});


function App() {
  return (
    <div>
      <ParticleBackground />
      <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <CenterTitle />
        </header>
      </div>
    </ApolloProvider>
    </div>
  );
}
function putCommas(input) {
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function CenterTitle() {
  const { loading, error, data } = useQuery(gql`
    query {
      protocolMetrics(first: 1) {
        ohmPrice
        totalValueLocked
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const metrics = data?.protocolMetrics[0];
  return (
    <div id="text_div center_all">
      <div className="center_all">
        <h1 className="custom-subTitle">Ohm Value :  {putCommas(Number(metrics.ohmPrice).toFixed(2))} </h1>
                <h1 className="custom-subTitle">Ohm treasury value : {putCommas(Number(metrics.totalValueLocked).toFixed(2))}</h1>
      </div>
    </div>
  );
}

export default App;
