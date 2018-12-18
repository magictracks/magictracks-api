module.exports = store

function store (state, emitter) {
  state.totalClicks = 10

  emitter.on('DOMContentLoaded', function () {
    emitter.on('clicks:add', function (count) {
      state.totalClicks += count
      emitter.emit(state.events.RENDER)
    })
  })
}
