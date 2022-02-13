import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../common/colors/Colors';
import ImagePath from '../../common/images/ImagePath';
import CustomTab from '../../components/Tab/CustomTab';
import styles from './Styles';
import MovieLists from '../../components/Lists/MovieLists';
import Constants from '../../common/contant/Constants';
import MoviesListPlay from '../../components/Lists/MoviesListPlay';
import Axios from 'axios';

export default function Home(props) {
  const [tab, setTab] = useState(Constants.latest);
  const [loading, setLoading] = useState(false);
  const [popularList, setPopularList] = useState([]);
  const [latestList, setLatestList] = useState(null);
  const [trendingList, setTrendingList] = useState(null);

  const {navigation} = props;

  useEffect(() => {
    getLatestList();
    getPopularList();
    getTrailerList();
  }, []);

  const getPopularList = async () => {
    setLoading(true);
    try {
      let response = await Axios({
        url: `https://api.themoviedb.org/3/discover/movie?api_key=02594f17504d1a82ec172f4a3de468ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
        method: 'GET',
      });
      setPopularList(response?.data?.results);
      setLoading(false);
    } catch (error) {
      console.log('Error getting Data ', {error});
      setLoading(false);
    }
  };

  const getLatestList = async () => {
    setLoading(true);
    try {
      let response = await Axios({
        url: `https://api.themoviedb.org/3/discover/movie?api_key=02594f17504d1a82ec172f4a3de468ea&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
        method: 'GET',
      });
      setLatestList(response?.data?.results);
      setLoading(false);
    } catch (error) {
      console.log('Error getting Data ', error);
      setLoading(false);
    }
  };

  const getTrailerList = async () => {
    setLoading(true);
    try {
      let response = await Axios({
        url: `https://api.themoviedb.org/3/trending/all/day?api_key=02594f17504d1a82ec172f4a3de468ea`,
        method: 'GET',
      });
      setTrendingList(response?.data?.results);
      setLoading(false);
    } catch (error) {
      console.log('Error getting TrailerList ', error);
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView>
        <CustomTab selectedTab={tab} onPress={e => setTab(e)} />
        {!loading ? (
          <>
            {tab === Constants.latest ? (
              <>
                <Text style={styles.txt}>{Constants.whatPopular}</Text>
                <FlatList
                  data={latestList}
                  horizontal
                  renderItem={({item, index}) => (
                    <MovieLists
                      item={item}
                      onPress={() =>
                        navigation.navigate('DetailPage', {
                          id: item.id,
                        })
                      }
                      onPressDot={() => console.log('Dot clicked')}
                    />
                  )}
                  scrollEnabled={true}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                />
                <ImageBackground
                  source={ImagePath.bannerBackground}
                  style={styles.background}>
                  <Text style={[styles.txt, {color: Colors.white}]}>
                    {Constants.latestTrailer}
                  </Text>
                  <FlatList
                    data={trendingList}
                    horizontal
                    renderItem={({item, index}) => (
                      <MoviesListPlay
                        item={item}
                        onPress={() => console.log('clicked')}
                      />
                    )}
                    scrollEnabled={true}
                    keyExtractor={(item, index) => item.productId}
                    showsHorizontalScrollIndicator={false}
                  />
                </ImageBackground>

                <Text style={styles.txt}>{Constants.trending}</Text>
                <FlatList
                  data={popularList}
                  horizontal
                  renderItem={({item, index}) => (
                    <MovieLists
                      item={item}
                      onPress={() =>
                        navigation.navigate('DetailPage', {
                          id: item.id,
                        })
                      }
                      onPressDot={() => console.log('Dot clicked')}
                    />
                  )}
                  scrollEnabled={true}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                />
              </>
            ) : (
              <View>
                <Text style={styles.txt}>{Constants.whatPopular}</Text>
                <FlatList
                  data={popularList}
                  horizontal
                  renderItem={({item, index}) => (
                    <MovieLists
                      item={item}
                      onPress={() =>
                        navigation.navigate('DetailPage', {
                          id: item.id,
                        })
                      }
                      onPressDot={() => console.log('Dot clicked')}
                    />
                  )}
                  scrollEnabled={true}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
          </>
        ) : (
          <ActivityIndicator color={Colors.darkBlue} size={'small'} />
        )}
      </ScrollView>
    </>
  );
}
