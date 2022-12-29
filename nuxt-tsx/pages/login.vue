<script lang="tsx">
import { Login } from '~~/components/Login'

export default defineComponent({
    props: {
        email: {
            type: String,
            default: "aiueo"
        },
        password: {
            type: String,
            default: "",
        }
    },
    setup(props) {
        return { email: props.email, password: props.password }
    },
    render() {
        return (
            <Login email={this.email} password={this.password} />
        )
    }
})

definePageMeta({
        layout: false,
})
</script>
