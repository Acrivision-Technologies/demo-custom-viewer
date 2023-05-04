import { BriefcaseDb, IModelHost } from "@itwin/core-backend";
import { Id64Arg } from "@itwin/core-bentley";

// enum BeforeRetry { Nothing = 0, PullMergePush = 1 }

export class PerformDbOperationsAsChangeSetService {
    private db: BriefcaseDb;
    private rootSubjectId: string;
    constructor(db: BriefcaseDb, rootSubjectId: string) {
        this.db = db;
        this.rootSubjectId = rootSubjectId
    }

    private persistChanges = async (changeDesc: string) => {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                console.log("inside the persistChanges");
                const revisionHeader = "Backend Sample";
                const access_token = await IModelHost.authorizationClient?.getAccessToken();
                const comment = `${revisionHeader} - ${changeDesc}`;
                // const isStandalone = this.jobArgs.dbType === "standalone";
                console.log(`db.isBriefcaseDb() => ${this.db.isBriefcaseDb()}`)
                await this.db.pullChanges({ accessToken: access_token });
                // console.log("changes pulled");
                console.log('comment');
                console.log(comment);
                await this.db.saveChanges(comment);
                console.log("db changes saved");

                await this.db.pushChanges({ description: comment, accessToken: access_token });

                console.log("db cahnges pushed")
                await this.db.locks.releaseAllLocks(); // in case there were no changes
                console.log("db changes released")
                // } else {
                // this.db.saveChanges(comment);
                // }
                resolve("persistChanges Done")
            } catch (e) {
                console.log(`Error while performing persistChanges`);
                console.log(e);
                reject(e);
            }

        })
    }


    private doWithRetries = async (task: () => Promise<void>): Promise<void> => {
        let count = 0;
        do {
            try {
                await task();
                return;
            } catch (err) {
                console.log(`Error case occured doWithRetries`);
                console.log(err);
                throw err;
            }
        } while (true);
    }

    private async acquireLocks(arg: { shared?: Id64Arg, exclusive?: Id64Arg }): Promise<void> {
        return this.doWithRetries(async () => this.db.locks.acquireLocks(arg));
    }

    public async doInChangesetChannel(task: () => Promise<any>, message: string): Promise<any> {

        return new Promise(async (resolve: any, reject: any) => {
            try {
                await this.acquireLocks({ shared: this.rootSubjectId, exclusive: this.rootSubjectId });  // automatically acquires shared lock on root subject (the parent/model)
                task()
                    .then(async (res: any) => {
                        console.log('res ===> ');
                        console.log(res);
                        this.persistChanges(message)
                            .then((res: any) => {
                                console.log("persistChanges res");
                                console.log(res);
                                resolve("Dlete confirmed");
                            })
                            .catch((error: any) => {
                                console.log("persistChanges error");
                                console.log(res);
                                reject(error);
                            })
                    })
                    .catch((error: any) => {
                        console.log("task execution error");
                        console.log(error);
                        reject(error);
                    })
            } catch (e) {
                console.log("doInChangesetChannel error");
                console.log(e)
                reject(e);
            }
        })


    }
}