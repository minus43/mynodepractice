import { PostDto } from './blog.model'; // 게시글의 타입 정보 임포트
import { Injectable } from '@nestjs/common';

// 리포진토리 클래스와 인터페이스 임포트
// import { BlogFileRepository, BlogRepository } from './blog.repository';
import { BlogMongoRepository } from './blog.repository';

@Injectable()
export class BlogService {
  // posts = []; // 게시글 배열 선언
  // blogRepository: BlogRepository;

  // constructor() {
  //   // 블로그 리포지토리 객체 생성
  //   this.blogRepository = new BlogFileRepository();
  // }
  // 생성자를 통한 의존성 주입
  // constructor(private blogRepository: BlogFileRepository) {}
  constructor(private blogRepository: BlogMongoRepository) {}

  async getAllPosts() {
    // 모든 게시글 가져오기
    // return this.posts;
    return await this.blogRepository.getAllPost();
  }

  createPost(postDto: PostDto) {
    // 게시글 작성
    // const id = this.posts.length + 1;
    // this.posts.push({ id: id.toString(), ...postDto, createdDt: new Date() });
    return this.blogRepository.createPost(postDto);
  }

  async getPost(id) {
    // 게시글 하나 가져오기
    // const post = this.posts.find((post) => {
    //   return post.id === id;
    // });
    // console.log(post);
    // return post;
    return await this.blogRepository.getPost(id);
  }

  delete(id) {
    // 게시글 삭제
    // const filteredPosts = this.posts.filter((post) => post.id !== id);
    // this.posts = [...filteredPosts];
    this.blogRepository.deletePost(id);
  }

  updatePost(id, postDto: PostDto) {
    // 게시글 업데이트
    // let updateIndex = this.posts.findIndex((post) => post.id === id);
    // const updatePost = { id, ...postDto, updatedDt: new Date() };
    // this.posts[updateIndex] = updatePost;
    // return updatePost;
    this.blogRepository.updatePost(id, postDto);
  }
}
