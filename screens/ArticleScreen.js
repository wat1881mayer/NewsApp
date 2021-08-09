import React from 'react'
import {StyleSheet,Text,SafeAreaView,TouchableOpacity} from 'react-native'
import {WebView} from 'react-native-webview'
import {useDispatch,useSelector} from 'react-redux'
import {addClip,deleteClip} from '../store/actios/user'
import ClipButton from '../components/ClipButton'
import Loding from '../components/Loding'

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
})

export default ArticleScreen = ({route})=> {
    const {article} = route.params
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const {clips} = user
    const isClipped = () => {
        return clips.some(clip => clip.url === article.url)
    }

    const toggleClip = () => {
        if(isClipped()){
            dispatch(deleteClip({clip:article}))
        }else{
            dispatch(addClip({clip: article}))
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <ClipButton onPress={toggleClip} enabled={isClipped()} />
                <WebView source={{ uri: article.url }} 
                        style={{marginTop:20}} 
                        scalesPageToFit={true}
                        startInLoadingState = {true}
                        renderLoading={()=> <Loding />}
                        />
        </SafeAreaView>
    )
}

