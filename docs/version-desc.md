`efront` is a growing project with many incomplete features and areas for optimization. So far, there have been three major versions of updates and many minor revisions. Currently, `efront` does not provide detailed release instructions for each small version. You can refer to the code [submit logs](https://github.com/yunxu1019/efront/commits/develop) to view the updated content in.

# The update instructions for the major version are as follows:

1.x `efront` is released in source code format, mainly relying on `esprima`, `esmangle`, `escodegen`, `pngjs`, `less node`, and `typescript` to provide compilation support

2.x `efront` is published in a self compiled format

3.x With a self built grammar parser, `efront` no longer relies on `esprima`, `esmangle`, and `escodegen`. The self compilation time has gradually decreased from the original 10 minute Github workflow to about 2 minutes.

4.0 No longer relying on `typescript` (nearly 170000 lines of source code), the compilation speed has increased by four times, the memory usage has been reduced to 1/8 of the original, and the self compilation time on GitHub has also been reduced to about 15 seconds.

4.1 No longer relying on `less-node` or `pngjs`, while the `less-node` is replaced with [suxin](https://www.npmjs.com/package/suxin) from `efront`.