import type { Register } from 'claude-code'

// 첫 실행 안내를 한 번만 띄우기 위한 플래그 (세션을 넘어 유지)
const INTRO_KEY = 'coach.introShown'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    // /champion 명령은 coach 스킬이 이미 제공한다(중복 등록 금지). 여기선 첫 실행 안내만.
    // 평소엔 조용. 처음 한 번만 가볍게 안내하고, 그 뒤엔 띄우지 않는다.
    const shown = await $.store.get(INTRO_KEY)
    if (!shown) {
      $.ui.toast('💡 AX 챔피언 사용 가능 — /champion 로 업무 자동화를 시작해보세요')
      await $.store.set(INTRO_KEY, true)
    }

    return next(e)
  })
}
