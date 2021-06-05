/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink , HttpLink} from '@apollo/client'
import { persistCache } from 'apollo3-cache-persist'
import AsyncStorage from '@react-native-community/async-storage'
import Navigator from "./router"
import {Root} from "native-base"
import Loading from "./components/Loading"

const cache = new InMemoryCache()
const httpLink = new HttpLink({
  uri: 'https://sugar-living-api.legobox.io/graphql',
})

const client = new ApolloClient({
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } }, 
  link: new ApolloLink(async (operation, forward) => {
    let token = await AsyncStorage.getItem('uat')
      operation.setContext({
        headers: {
          Authorization: token? `Bearer ${token}` : ''
        }
      })
	
	  return forward(operation)
  }).concat(httpLink)
})

const App =  () => {

  const [loadingCache, setLoadingCache] = useState(true)

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false))
  }, [])

  if (loadingCache) {
    return <Loading />
  }

  return (
    <ApolloProvider client={client}>
      <Root>
        <Navigator></Navigator>
      </Root>
    </ApolloProvider>
  );
}

export default App;
