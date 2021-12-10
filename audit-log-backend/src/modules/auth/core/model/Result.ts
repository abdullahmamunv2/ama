export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean;
    public error: string;
    public errorCode: string;
    private _value: T;

    private constructor(isSuccess: boolean, error: string, value: T, errorCode: string) {
        if (isSuccess && error) {
            throw new Error(`InvalidOperation: A result cannot be 
successful and contain an error`);
        }
        if (!isSuccess && !error) {
            throw new Error(`InvalidOperation: A failing result 
          needs to contain an error message`);
        }

        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this.errorCode = errorCode;
        this._value = value;

        Object.freeze(this);
    }

    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error(`Cant retrieve the value from a failed result.`);
        }

        return this._value;
    }

    public getErrorCode() {
        return this.errorCode;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, '', value as U, '');
    }

    public static fail<U>(error: string, code = 'ERR_FAILED'): Result<U> {
        return new Result<U>(false, error, {} as U, code);
    }

    public static combine(results: Result<any>[]): Result<any> {
        for (const result of results) {
            if (result.isFailure) return result;
        }
        return Result.ok<any>();
    }
}
