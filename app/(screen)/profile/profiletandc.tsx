import { Ionicons } from '@expo/vector-icons'
import { goBack } from 'expo-router/build/global-state/routing'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const Profiletandc = () => {
  return (
    <View className='flex-1 bg-white'>
     {/* Header */}
      <View className='flex-row w-full bg-primary'>
        <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={() => { goBack() }} />
        <Text className='text-white text-xl  mt-5'>Terms and Conditions</Text>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={true}
        // className='flex-1 bg-white'
      >

      <View className='px-6 py-10'>

        <Text className='text-2xl font-semibold mb-4 text-primary'>Terms and Conditions</Text>
        <Text className='text-base mb-4 mt-3 text-justify'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A officia odit ratione, optio doloremque id possimus! Praesentium ex fuga iusto assumenda, sit quisquam blanditiis architecto saepe non eum fugit, dicta tenetur natus error odit aspernatur, distinctio corrupti? Suscipit et expedita at dolorem, cum laboriosam perspiciatis iure, necessitatibus accusantium, similique nam. Perspiciatis doloremque debitis laudantium ut eveniet odio. Laboriosam perspiciatis beatae eaque tempore reprehenderit! Accusantium quod natus impedit repellat est! Reprehenderit natus repellendus neque quo exercitationem dolorum. Nemo fuga placeat a aliquam veritatis dolor veniam eligendi, nam eos quidem cum, aspernatur nisi! Est tenetur perferendis quae harum maxime, numquam veritatis laborum esse libero deserunt laudantium eius eaque? Asperiores adipisci expedita sint ad perferendis consequatur non repellat autem assumenda at, quibusdam possimus et maiores nulla ea officia, quod harum tempore, enim iste. Reiciendis iure dignissimos recusandae itaque fugiat consequuntur dolores ipsa. Eum cumque unde minima labore. Aliquam fugiat nobis minima qui, voluptate quis quasi ab deserunt, corporis, cumque est! Voluptate earum dolor quisquam voluptatem doloribus perferendis recusandae velit iure tempora, incidunt quo laboriosam unde modi voluptatibus sapiente alias, rerum fuga eligendi soluta et reiciendis, nam aspernatur facilis. Voluptas fugit unde est dignissimos fugiat hic debitis doloremque inventore incidunt tempore! Ut laborum ipsa dolores? Pariatur itaque, eaque eveniet, id alias rem accusamus aliquam cum non et rerum veritatis inventore necessitatibus ut dolorem, harum placeat consequatur minima ea quasi asperiores repudiandae porro. Similique ab quae quod animi fugit illum distinctio, assumenda facilis illo corporis id cumque ipsa alias. Ullam iusto molestias unde maxime saepe ipsa pariatur ex natus doloribus. Quidem ipsa commodi, nostrum, esse totam eos provident nam hic maiores minus quae possimus dolor iste soluta. Doloribus voluptatibus voluptatem illo alias nesciunt aliquid, sint dolorum animi dolore accusamus rem praesentium commodi sed expedita consectetur quisquam cum dolores! Eligendi, aliquid hic ipsam saepe quam ratione fugit obcaecati. Dolorum vel mollitia doloribus autem explicabo veritatis qui quas, nobis assumenda quis, possimus molestiae asperiores maiores ad, odio sunt quaerat nulla illum? Dolorem, quia excepturi. Dicta minima cum officiis reiciendis officia! Ipsam repudiandae saepe tempore vitae veniam quae laudantium, quaerat at voluptate quam non ut praesentium assumenda nulla qui veritatis? Repellendus ex quod labore optio nemo architecto tempora eos quos blanditiis quibusdam error aliquid temporibus vero porro id, nobis esse? Sunt tenetur, recusandae repudiandae distinctio a vel quisquam ad adipisci, assumenda asperiores odio vitae error, facilis beatae laborum nesciunt id totam eos quae aperiam harum magni ducimus. Veritatis natus quisquam facilis, labore corrupti hic a reiciendis error, odio quasi dolore perferendis nemo eaque. Asperiores tenetur debitis libero unde corrupti numquam explicabo recusandae saepe velit doloremque quis consequuntur a esse dignissimos fuga quaerat cum deleniti similique mollitia assumenda culpa distinctio, alias sequi! Deserunt cum earum exercitationem perferendis, corrupti assumenda molestiae pariatur explicabo cupiditate eveniet repudiandae, itaque harum! Incidunt, nisi sit nihil maiores fugiat, praesentium aperiam ratione enim inventore possimus dignissimos tempore accusamus quibusdam expedita. Officiis ipsum qui debitis pariatur tempora, praesentium minus odio sint, quis quisquam quia eligendi aliquid nisi quo! Aspernatur numquam molestiae quos, officiis doloribus earum ipsum!
        </Text>
      </View>
      </ScrollView>

    </View>
  )
}

export default Profiletandc
