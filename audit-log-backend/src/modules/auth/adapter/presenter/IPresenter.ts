import PresenterResponse from "./PresenterResponse";




export default interface IPresenter<T>{
    present(viewModel : T):PresenterResponse
}