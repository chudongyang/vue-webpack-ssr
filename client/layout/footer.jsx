import '../assets/css/footer.styl'

export default{
  data () {
    return {
      author: 'chudongyang'
    }
  },
  render () {
    return (
      <div class="footer">Write by {this.author}</div>
    )
  }
}
