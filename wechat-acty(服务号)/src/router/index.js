import Vue from 'vue'
import Router from 'vue-router'

const RedPacket = (resolve) => {
  import('components/red-packet/red-packet').then((module) => {
    resolve(module)
  })
}

const WheelSurf = (resolve) => {
  import('components/wheel-surf/wheel-surf').then((module) => {
    resolve(module)
  })
}

const Withdrawals = (resolve) => {
  import('components/withdrawals/withdrawals').then((module) => {
    resolve(module)
  })
}

const Video = (resolve) => {
  import('components/detail/detail').then((module) => {
    resolve(module)
  })
}

const Recommend = (resolve) => {
  import('components/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const Funny = (resolve) => {
  import('components/funny/funny').then((module) => {
    resolve(module)
  })
}

const User = (resolve) => {
  import('components/user/user').then((module) => {
    resolve(module)
  })
}

const MyHome = (resolve) => {
  import('components/recommend/my-home').then((module) => {
    resolve(module)
  })
}

const Invite = (resolve) => {
  import('components/invite/invite').then((module) => {
    resolve(module)
  })
}

const InviteShare = (resolve) => {
  import('components/invite/share').then((module) => {
    resolve(module)
  })
}

const FortuneTelling = (resolve) => {
  import('components/fortunetelling/fortunetelling').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/red-packet',
      name: 'red-packet',
      component: RedPacket
    },
    {
      path: '/wheel-surf',
      name: 'wheel-surf',
      component: WheelSurf
    },
    {
      path: '/withdrawals',
      name: 'withdrawals',
      component: Withdrawals
    },
    {
      path: '/video',
      name: 'video',
      component: Video
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/myhome',
      name: 'myhome',
      component: MyHome
    },
    {
      path: '/invite',
      name: 'invite',
      component: Invite
    },
    {
      path: '/share',
      name: 'share',
      component: InviteShare
    },
    {
      path: '/funny',
      name: 'funny',
      component: Funny
    },
    {
      path: '/fortunetelling',
      name: 'fortunetelling',
      component: FortuneTelling
    }
  ]
})
